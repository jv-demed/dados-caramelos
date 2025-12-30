import { FaRegEdit } from 'react-icons/fa';
import { LuLoaderCircle } from 'react-icons/lu';
import { IoMenu, IoClose } from 'react-icons/io5';
import { MdOutlineStorefront } from 'react-icons/md';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { FaMinus, FaPlus, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

export const ICONS = {
    close: IoClose,
    edit: FaRegEdit,
    eye: FaRegEye,
    eyeOff: FaRegEyeSlash,
    login: BiLogInCircle,
    logout: BiLogOutCircle,
    menuHamburger: IoMenu,
    minus: FaMinus,
    plus: FaPlus,
    spinLoader: LuLoaderCircle,
    store: MdOutlineStorefront
}