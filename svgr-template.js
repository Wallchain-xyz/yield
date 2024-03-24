const propTypesTemplate = ({ imports, interfaces, componentName, props, jsx, exports }, { tpl }) => {
  const title = componentName.replace(/^Svg(.*)$/, '$1 Icon');

  // Add title attribute to svg element
  const titleAttribute = {
    type: 'JSXAttribute',
    name: { type: 'JSXIdentifier', name: 'title' },
    value: { type: 'StringLiteral', value: title },
  };
  jsx.openingElement.attributes.push(titleAttribute);

  return tpl`${imports}
${interfaces}

function ${componentName}(${props}) {
  return ${jsx};
}

${componentName}.title = '${componentName}';

${exports}
`;
};

module.exports = propTypesTemplate;
