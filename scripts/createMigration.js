const { exec } = require('child_process');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Por favor, informe o nome da migration como argumento.');
  process.exit(1);
}

const command = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create src/database/migrations/${migrationName}`;

console.log(`Executando: ${command}`);

const child = exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao criar migration: ${error.message}`);
    process.exit(1);
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  console.log(stdout);
});

child.stdout.pipe(process.stdout);

