export default function Layout({ children }) {

    return (

        <div
            style={{
                marginLeft: "260px",
                width: "calc(100% - 260px)",
                padding: "20px"
            }}
        >
            {children}
        </div>

    );
}