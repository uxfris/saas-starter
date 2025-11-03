# Contributing Guide

Thank you for considering contributing to this project! This guide will help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/template.git`
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env.local` and fill in values
5. Set up database: `npm run db:push`
6. Start dev server: `npm run dev`

## Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes

Example: `feature/add-user-profile`

### Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

Examples:
```
feat(auth): add password reset functionality
fix(stripe): handle webhook timeout errors
docs(readme): update setup instructions
```

### Code Style

- Run `npm run lint` before committing
- Run `npm run format` to format code
- Pre-commit hooks will automatically check code

### Pull Request Process

1. Create a feature branch
2. Make your changes
3. Add/update tests if needed
4. Update documentation if needed
5. Run `npm run lint` and `npm run type-check`
6. Commit your changes
7. Push to your fork
8. Create a pull request

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

## Code Guidelines

### TypeScript

- Use strict mode
- Avoid `any` type
- Export types when needed
- Use type inference from Zod schemas

### React Components

```tsx
// Good: Server Component (default)
export default function MyComponent() {
  return <div>Hello</div>
}

// Client Component when needed
"use client"
export function InteractiveComponent() {
  const [state, setState] = useState()
  return <div>Interactive</div>
}
```

### Server Actions

```tsx
"use server"

export async function myAction(formData: FormData) {
  return handleServerAction(async () => {
    // Validate input
    const data = schema.parse(formData)
    
    // Business logic
    const result = await doSomething(data)
    
    // Revalidate if needed
    revalidatePath("/path")
    
    return result
  })
}
```

### File Structure

```tsx
// imports
import { } from "package"

// types
type Props = {}

// component
export default function Component({ }: Props) {
  // hooks
  // handlers
  // render
}

// helper functions (if small)
function helper() {}
```

## Testing

### Unit Tests

```bash
npm run test
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for architectural changes
- Add JSDoc comments for complex functions
- Update SETUP.md for setup changes

## Questions?

- Open an issue for bugs
- Start a discussion for questions
- Check existing issues/PRs first

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

