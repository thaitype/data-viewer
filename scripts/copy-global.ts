
import fs from 'fs-extra';
import path from 'node:path';

async function main(){
    await fs.copy(path.resolve(__dirname, '../src/globals.mjs'), path.resolve(__dirname, '../dist/globals.mjs'));
    await fs.copy(path.resolve(__dirname, '../src/globals.d.ts'), path.resolve(__dirname, '../dist/globals.d.ts'));
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});