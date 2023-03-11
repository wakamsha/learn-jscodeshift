import type { API, Collection, FileInfo, JSCodeshift } from 'jscodeshift';

export default function transform({ source }: FileInfo, { jscodeshift: j }: API) {
  const rootCollection = j(source);

  // Step.1
  // `[...Array(n).keys()]` に該当する node コレクションを取得する
  const collection = rootCollection.find(j.ArrayExpression, {
    elements: [
      {
        type: 'SpreadElement',
        argument: {
          callee: {
            object: {
              callee: {
                name: 'Array',
              },
            },
            property: {
              name: 'keys',
            },
          },
        },
      },
    ],
  });

  if (collection.length > 0) {
    // Step.2
    replaceToRange(j, collection);
    insertImportSpecifier(j, rootCollection);
  }

  // Step.3
  return rootCollection.toSource();
}

/** 
 * `[...Array(n).keys()]` を `range(n)` に置換する。
 */
function replaceToRange(j: JSCodeshift, collection: Collection) {
  collection.forEach(path => {
    j(path).replaceWith(
      j.callExpression(
        j.identifier('range'),
        path.value.elements[0].argument.callee.object.arguments,
      ),
    );
  });
}

/** 
 * `import { range } from './utils/Array';` を挿入する。
 */
function insertImportSpecifier(j: JSCodeshift, root: Collection) {
	// 既に `utils/Array` の import 文が存在するかどうかをチェックする。
  const collection = root.find(j.ImportDeclaration, {
    source: {
      value: './utils/array',
    },
  });

  const rangeImportSpecifier = j.importSpecifier(j.identifier('range'));

  if (collection.length === 0) {
		// まだ `utils/Array` がなければ import 宣言ブロックの一番先頭に行ごと挿入する。
    root
      .find(j.ImportDeclaration)
      .at(0)
      .get()
      .insertBefore(
        j.importDeclaration(
          [rangeImportSpecifier],
          j.stringLiteral('./utils/array'),
        ),
      );
  } else {
		// 既に存在していれば `import {...} from` に `range` Node を挿入する。
    collection.forEach(path => {
      j(path).replaceWith(
        j.importDeclaration(
          [...(path.node.specifiers ?? []), rangeImportSpecifier],
          path.node.source,
        ),
      );
    });
  }
}
