import { StyleSheet } from "react-native";
import { EditIcon, ArrowUpIcon, InfoIcon } from 'lucide-react-native';
import PropTypes from 'prop-types';
import {
    Button,
    ButtonText,
    ButtonSpinner,
    ButtonIcon
} from "@/components/library/button";

const AppButton = ({ size, btnType, ctaName, title }) => (
    <Button size={size} className={`btn-type ${btnType}`} title={title}>
        <ButtonSpinner style={color.shade} />
        <ButtonIcon as={EditIcon} />
        <ButtonIcon as={ArrowUpIcon} />
        <ButtonText>{ctaName}</ButtonText>
        <ButtonIcon as={InfoIcon} />
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