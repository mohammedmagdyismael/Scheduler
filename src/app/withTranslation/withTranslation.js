import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line import/prefer-default-export
export const withTranslation = WrappedComponent => {
  const Localization = props => {
    const [localization, setLocalization] = useState(undefined);
    const { language } = props;
    useEffect(() => {
      debugger
      if (language) {
        setLocalization(undefined);
        fetch(`/Scheduler/localization/${language}.json`)
          .then(response => response.json())
          .then(locale => {
            setLocalization(locale);
          })
          .catch(() => {
            fetch(`/Scheduler/localization/en.json`)
              .then(response => response.json())
              .then(locale => {
                setLocalization(locale);
              })
              .catch(() => {});
          });
      }
    }, [language]);

    return <div>{localization && (<WrappedComponent localization={localization} />)}</div>;
  };

  const mapStateToProps = state => ({
    language: state.app.language,
  });

  return connect(mapStateToProps, null)(Localization);
};
