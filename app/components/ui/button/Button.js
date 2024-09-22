import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';

import {
    Button,
    ButtonText,
    ButtonSpinner
} from "@/components/library/button";


const AppButton = ({ size, btnType, ctaName, title }) => (
    <Button size={size} className={`btn-type ${btnType}`} title={title}>
        <ButtonSpinner style={color.shade} />
        <ButtonText>{ctaName}</ButtonText>
    </Button>
);

AppButton.propTypes = {
    size: PropTypes.string,
    btnType: PropTypes.string,
    ctaName: PropTypes.string,
    title: PropTypes.string
}

export default AppButton;

const color = StyleSheet.create({
    shade: {
      color: "#fff",
    },
});