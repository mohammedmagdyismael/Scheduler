/* eslint-disable react/forbid-prop-types */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../icon/Icon';
import IconsStore from '../../IconsStore';
import {
  FieldContainer,
  SearchInput,
  ValueTagContainerImage,
  DisableOverLay,
  ImagePreview,
  Text,
  FileViewOverlay,
  CancelIcon,
  AttatchContainer,
  FileViewItem,
  ButtonEdit,
} from './ImageUploader.style';

const ImageUploader = ({ ...props }) => {
  const {
    fieldLabel,
    componentName,
    fieldValue,
    extendDropDownStyle,
    extendFieldText,
    extendFieldContainer,
    icon,
    iconSize,
    isDisabled,
    localization,
    isEditable,
    onChange,
    language,
    submittedLocalization,
    onFileView,
    onInputFieldClick,
  } = props;
  const [value, setValue] = useState(fieldValue);
  const [isFocued, setFocus] = useState(true);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [isFileViewOverlay, toggleIsFileViewOverlay] = useState(false);
  const fileInputRef = useRef(null);

  const getImageFormUrl = url =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0);
        const dataURI = canvas.toDataURL('image/jpg');
        resolve(dataURI);
      };
      img.onerror = reject;
      img.src = url;
    });

  const displayCardImage = async url => {
    const ConvertedBase64 = await getImageFormUrl(url);
    // eslint-disable-next-line no-unused-vars
    const fileObj = {
      fileData: 'currentFile',
      fileName: 'name',
      fileType: 'image/png',
      base64: ConvertedBase64,
      compressedVersion: false,
      dimensions: {},
      isConverted: true,
      shouldBeProcessed: true,
      shouldBypassCompression: true,
    };
    setPreview(ConvertedBase64);
  };

  useEffect(
    () => {
      if (value) {
        displayCardImage(value);
      }
    },
    [value],
  );

  useEffect(
    () => {
      if (fieldValue) setValue(fieldValue);
      else setValue('');
    },
    [fieldValue],
  );

  useEffect(
    () => {
      if (image) {
        onChange(image);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
      }
    },
    [image],
  );

  const onImageChange = async event => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setImage(file);
    }
  };

  const getFocusOnInputField = () => {
    setFocus(true);
    if (document.getElementById(`input-container-${componentName}`)) {
      document.getElementById(`input-container-${componentName}`).focus();
    }
  };

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    document.getElementById(`input-container-${componentName}`).click();
    onInputFieldClick();
  };

  return (
    <div style={{ position: 'relative' }}>
      <DisableOverLay extendDropDownStyle={extendDropDownStyle} isDisabled={isDisabled} />
      <FieldContainer
        extendDropDownStyle={extendFieldContainer}
        extendFieldContainer={extendFieldContainer}
        className={`input-${componentName}`}
        onClick={() => getFocusOnInputField()}
      >
        <FileViewOverlay
          onClick={() => toggleIsFileViewOverlay(!isFileViewOverlay)}
          isFileViewOverlay={isFileViewOverlay}
        >
          <span
            onClick={e => {
              if (e) e.stopPropagation();
            }}
          >
            <CancelIcon onClick={() => toggleIsFileViewOverlay(false)} />
            <FileViewItem src={preview} />
          </span>
        </FileViewOverlay>
        <div style={{ width: '100%' }}>
          {isFocued && (
            <ValueTagContainerImage preview={preview}>
              {preview ? (
                <React.Fragment>
                  <ImagePreview
                    alt="imgpreview"
                    src={preview}
                    onClick={() => {
                      toggleIsFileViewOverlay(!isFileViewOverlay);
                      onFileView();
                    }}
                  />
                  <Text> {submittedLocalization} </Text>
                  {isEditable && (
                    <ButtonEdit onClick={onButtonClick} language={language}>
                      <Icon
                        className="icon"
                        icon={IconsStore.getIcon('horizDots')}
                        width={30}
                        style={{ verticalAlign: '-webkit-baseline-middle' }}
                      />
                    </ButtonEdit>
                  )}
                </React.Fragment>
              ) : (
                <AttatchContainer onClick={onButtonClick}>
                  {icon && (
                    <Icon
                      className="icon"
                      icon={IconsStore.getIcon(icon)}
                      width={iconSize}
                      style={{ margin: '0 5px' }}
                    />
                  )}
                  {localization.attatch} {fieldLabel}
                </AttatchContainer>
              )}

              {/* <FieldTag>{fieldTag}</FieldTag> */}
              {isFocued && (
                <SearchInput
                  extendFieldText={extendFieldText}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  id={`input-container-${componentName}`}
                  type="file"
                  accept="image/*"
                  // value={value}
                  onChange={event => onImageChange(event)}
                />
              )}
            </ValueTagContainerImage>
          )}
        </div>
      </FieldContainer>
    </div>
  );
};

ImageUploader.propTypes = {
  fieldValue: PropTypes.string,
  fieldLabel: PropTypes.string.isRequired,
  componentName: PropTypes.string,
  fieldTag: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  iconSize: PropTypes.number,
  extendDropDownStyle: PropTypes.string,
  extendFieldContainer: PropTypes.array,
  extendFieldText: PropTypes.array,
  validation: PropTypes.array,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  localization: PropTypes.object,
  isEditable: PropTypes.bool,
  language: PropTypes.string,
  submittedLocalization: PropTypes.string,
  onFileView: PropTypes.func,
  onInputFieldClick: PropTypes.func,
};

ImageUploader.defaultProps = {
  onFileView: () => {},
  onInputFieldClick: () => {},
};
export default ImageUploader;
