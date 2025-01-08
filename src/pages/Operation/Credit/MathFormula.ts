import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
  formula: string; // LaTeX 公式
  isInline?: boolean; // 是否为行内公式
}

const MathFormula: React.FC<MathFormulaProps> = ({ formula, isInline = false }) => {
  const html = katex.renderToString(formula, {
    throwOnError: false,
    displayMode: !isInline, // 是否为块级公式
  });

  return React.createElement('span', { dangerouslySetInnerHTML: { __html: html } });
};

export default MathFormula;
