import { EditIcon } from 'lucide-react-native';
import {
    Button,
    ButtonIcon
} from "@/components/library/button";

export default function BtnIcon() {
    return (
        <Button size="xxl" className="rounded-full p-3.5">
            <ButtonIcon as={EditIcon} />
        </Button>
    )
}