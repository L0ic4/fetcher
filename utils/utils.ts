export const initialHeaders = '{"Authorization": "Bearer YOUR_TOKEN_HERE"}';
export const initialBody = '{"test": "test"}';
export const initialUrl = "https://exemple.com";
export const initialMethod = "GET";


export const generateTypeDeclaration = obj => {
    let interfaceName = 'GeneratedInterface'; // Nom par défaut de l'interface
    let typeDeclaration = `export interface ${interfaceName} {\n`;

    for (const [key, value] of Object.entries(obj)) {
        typeDeclaration += `    ${key}: ${typeof value};\n`;
    }

    typeDeclaration += `}`;

    return typeDeclaration;
};


export const updateTypeDeclaration = ({data, setTypeDeclaration}) => {
    if (Array.isArray(data) && data.length > 0) {
      setTypeDeclaration(generateTypeDeclaration(data[0]));
    } else if (typeof data === "object" && data !== null) {
      setTypeDeclaration(generateTypeDeclaration(data));
    }
  };

export  const resetFields = ({setHeaders, setBody, setResponse, setUrl, setMethod, setTypeDeclaration}) => {
    setHeaders(initialHeaders);
    setBody(initialBody);
    setResponse(null);
    setUrl(initialUrl);
    setMethod(initialMethod);
    setTypeDeclaration("");
  };
