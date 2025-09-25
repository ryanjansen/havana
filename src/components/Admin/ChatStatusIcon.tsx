import { ChatStatus } from "@/types/chat";
import { GoPersonFill } from "react-icons/go";
import { MdPending } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";

interface Properties {
    status: ChatStatus;
}

const ChatStatusIcon = ({ status }: Properties) => {
    const icon =
        status === ChatStatus.AI ? (
            <RiRobot2Fill />
        ) : status === ChatStatus.Human ? (
            <GoPersonFill />
        ) : (
            <MdPending color="red" />
        );
    return <div className="w-4 h-4 absolute top-2 right-2">{icon}</div>;
};

export default ChatStatusIcon;
