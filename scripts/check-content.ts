import { validateContent } from './content-validation';
try {
  const { projects, contributions } = validateContent();
  console.log(`Content valid: ${projects.length} projects, ${contributions.length} contributions.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
