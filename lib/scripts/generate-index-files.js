// eslint-disable-next-line no-undef
const fs = require('fs');
// eslint-disable-next-line no-undef
const path = require('path');

function modifyIndexFileComponentsSection(INSERT_START, INSERT_END, inputFolderPath, outputFilePath, fn) {
    const folders = fs.readdirSync(inputFolderPath).filter((c) => !c.includes('.'));
    const indexContent = fs.readFileSync(outputFilePath).toString();
    const startIndex = indexContent.indexOf(INSERT_START) + INSERT_START.length;
    const endIndex = indexContent.indexOf(INSERT_END);
    const notByConventionComponents = checkConvention(folders);

    if (notByConventionComponents.length) {
        console.error(
            'ERROR!!! Some components do not follow convention. Component file name should be equal to the folder name + suffix. For example button.component.ts or table.component.ts',
        );
        console.error('ERROR!!! Check the following components:');

        for (const component of notByConventionComponents) {
            console.error(component);
        }
        throw new Error();
    } else {
        const result =
            indexContent.substring(0, startIndex) +
            '\n' +
            folders.map((component) => fn(component)).join('\n') +
            '\n' +
            indexContent.substring(endIndex);

        fs.writeFileSync(outputFilePath, result);

        console.log('components are prepared ' + outputFilePath);
    }

    function checkConvention(folders) {
        const notByConvention = [];
        for (const folder of folders) {
            const url = path.join(inputFolderPath, folder);
            const dirContent = fs.readdirSync(url);
            try {
                if (!dirContent.includes(`${folder}.component.tsx`)) {
                    notByConvention.push(folder);
                }
            } catch (ex) {
                notByConvention.push(folder);
            }
        }

        return notByConvention;
    }
}

function modifyIndexFile(
    INSERT_START,
    INSERT_END,
    inputFolderPath,
    outputFilePath,
    fnValidate,
    fnExportString,
) {
    const files = fs
        .readdirSync(inputFolderPath)
        .filter((c) => c.includes('.'))
        .filter((c) => !c.includes('index.ts'));

    const indexContent = fs.readFileSync(outputFilePath).toString();
    const startIndex = indexContent.indexOf(INSERT_START) + INSERT_START.length;
    const endIndex = indexContent.indexOf(INSERT_END);
    const notByConventionFiles = checkConvention(files);

    if (notByConventionFiles.length) {
        console.error(
            'ERROR!!! Some (enum/interface/hook .etc) do not follow convention. File name should be equal to the folder name + suffix. For example is-debug.constant.ts or color.enum.ts',
        );
        console.error('ERROR!!! Check the following components:');

        for (const component of notByConventionFiles) {
            console.error(component);
        }

        throw new Error();
    } else {
        const result =
            indexContent.substring(0, startIndex) +
            '\n' +
            files.map((component) => fnExportString(component)).join('\n') +
            '\n' +
            indexContent.substring(endIndex);

        fs.writeFileSync(outputFilePath, result);

        console.log('index are prepared for ' + outputFilePath);
    }

    function checkConvention(folders) {
        const notByConvention = [];
        for (const folder of folders) {
            const url = path.join(inputFolderPath, folder);
            if (!fnValidate(url)) {
                notByConvention.push(url);
            }
        }

        return notByConvention;
    }
}


modifyIndexFile(
    '// INSERT ENUMS START',
    '// INSERT ENUMS END',
    path.resolve('./src/enums'),
    path.resolve('./src/index.ts'),
    (url) => url.includes('enum.ts'),
    (fileName) =>
        `export * from './enums/${fileName.replace('.tsx', '').replace('.ts', '')}';`,
);

modifyIndexFile(
    '// INSERT CONSTANTS START',
    '// INSERT CONSTANTS END',
    path.resolve('./src/constants'),
    path.resolve('./src/index.ts'),
    (url) => url.includes('constant.ts'),
    (fileName) =>
        `export * from './constants/${fileName.replace('.tsx', '').replace('.ts', '')}';`,
);

modifyIndexFile(
	'// INSERT INTERFACES START',
	'// INSERT INTERFACES END',
    path.resolve('./src/interfaces'),
    path.resolve('./src/index.ts'),
    (url) => url.includes('interface.ts'),
    (fileName) =>
        `export * from './interfaces/${fileName
            .replace('.tsx', '')
            .replace('.ts', '')}';`,
);

modifyIndexFile(
	'// INSERT UTILS START',
	'// INSERT UTILS END',
    path.resolve('./src/utils'),
    path.resolve('./src/index.ts'),
    (url) => url.includes('util.ts'),
    (fileName) =>
        `export * from './utils/${fileName.replace('.tsx', '').replace('.ts', '')}';`,
);

modifyIndexFile(
	'// INSERT HOOKS START',
	'// INSERT HOOKS END',
    path.resolve('./src/hooks'),
    path.resolve('./src/index.ts'),
    (url) => url.includes('hook.ts'),
    (fileName) =>
        `export * from './hooks/${fileName.replace('.tsx', '').replace('.ts', '')}';`,
);

modifyIndexFileComponentsSection(
    '// INSERT GENERAL-UI START',
    '// INSERT GENERAL-UI END',
    path.resolve('./src/general-ui'),
    path.resolve('./src/index.ts'),
    (folderName) => `export * from './general-ui/${folderName}/${folderName}.component';`,
);