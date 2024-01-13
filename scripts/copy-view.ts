
import fs from 'fs-extra';
import path from 'node:path';

/**
 * Release policy:

 * pnpm publish --access public
 * git tag -a v0.1.0 -m "v0.1.0"
 * git push origin --tags
 */


async function main(){
    const src = path.resolve(__dirname, '../src/view-server/views');
    const dest = path.resolve(__dirname, '../dist/views');
    await fs.copy(src, dest);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});