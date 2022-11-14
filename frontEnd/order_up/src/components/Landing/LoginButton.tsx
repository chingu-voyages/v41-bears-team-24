const buttonStyle = "m-2  bg-blue-500 rounded-lg p-10 text-white text-xl cursor-pointer hover:bg-blue-600";
interface LoginButtonProps {click: Function, username: string, label: string};

const LoginButton = ({ click, username, label}: LoginButtonProps) => {
    return (
        <p onClick={() => click(username)} className={buttonStyle}>{label}</p>       
    )
}

export default LoginButton;