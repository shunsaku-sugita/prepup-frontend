import PropTypes from 'prop-types';
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage
} from "@/components/library/avatar";

const UserAvatar = ({ className, fallback, source, callback}) => (
    <Avatar className={`user-avatar ${className}`} onClick={callback || null}>
        <AvatarFallbackText>{fallback}</AvatarFallbackText>
        <AvatarImage source={{uri:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"}} />
    </Avatar>
);

UserAvatar.propTypes = {
    className: PropTypes.string,
    fallback: PropTypes.string,
    source: PropTypes.string,
    callback: PropTypes.func
}

export default UserAvatar;