import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';

import styles from './CodeBlock.module.scss';

const CodeBlock = props => (
  <div className={styles.codeBlock}>
    <code className={styles.code}>
      {props.children}
    </code>
    <CopyToClipboard text={props.children}>

      <div className={styles.copy}>
        <FaCopy />
      </div>
    </CopyToClipboard>
  </div>
);

export default CodeBlock;
