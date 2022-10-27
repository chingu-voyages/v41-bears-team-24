const buttonStyle = "m-2 border-solid border-2 border-indigo-700 bg-blue-500 rounded p-10 text-white text-xl hover:text-gray-300";
interface LoginButtonProps {click: Function, username: string, label: string};

const LoginButton = ({ click, username, label}: LoginButtonProps) => {
    return (
        <p onClick={() => click(username)} className={buttonStyle}>{label}</p>       
    )
}

export default LoginButton;