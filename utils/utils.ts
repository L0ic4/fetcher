export const generateTypeDeclaration = (obj) => {
  let interfaceName = "GeneratedInterface"; // Nom par défaut de l'interface
  let typeDeclaration = `export interface ${interfaceName} {\n`;

  for (const [key, value] of Object.entries(obj)) {
    typeDeclaration += `    ${key}: ${typeof value};\n`;
  }

  typeDeclaration += `}`;

  return typeDeclaration;
};
