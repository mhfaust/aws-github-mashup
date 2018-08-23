import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon, Popup } from  'semantic-ui-react';

const View = ({copyText, displayText, className, isOpen, handleOpen, handleClose}) => {
    displayText = displayText || copyText;
    return (
        <Popup 
            trigger={
                <span>
                    <CopyToClipboard className={`Clipboard clickable ${className}`} text={copyText}>
                        <span className="ellipsized clickable">
                            <Icon name="clipboard"  />
                            {displayText}
                        </span>
                    </CopyToClipboard>

                </span>
            }
            open={isOpen}
            content="Copied to clipboard." 
            on="click"
            onOpen={handleOpen}
            onClose={handleClose}
        />
    )}


export default View;