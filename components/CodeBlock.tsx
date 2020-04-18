import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';

import './CodeBlock.scss';

const CodeBlock = props => (
  <div className="code-block">
    <code>
      {props.children}
    </code>
    <CopyToClipboard text={props.children}>

      <div className="copy">
        <FaCopy />
      </div>
    </CopyToClipboard>
  </div>
);

export default CodeBlock;
