import React from 'react';
import Text from './Text';
import { FONT_TYPES } from '../base/Typography';

const Title = props => <Text tag="h1" type={FONT_TYPES.TITLE} {...props} />;
const Heading = props => <Text tag="h3" type={FONT_TYPES.HEADING} {...props} />;
const Subheading = props => <Text tag="h3" type={FONT_TYPES.SUBHEADING} {...props} />;
const Caption = props => <Text tag="span" type={FONT_TYPES.CAPTION} {...props} />;

export { Heading, Subheading, Title, Caption };
