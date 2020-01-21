import Router from "next/router";

const Error = () => null;

Error.getInitialProps = ({ isServer, res }) => {
    if (isServer) {
        res.writeHead(302, {
            Location: "/404/"
        });

        res.end();
    } else Router.push("/404/");

    return { isServer };
};

export default Error;
