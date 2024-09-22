import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from "@/components/library/avatar";

export default function AvatarComponent() {
    return (
        <Avatar>
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage source={{uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",}} />
        </Avatar>
    )
}

