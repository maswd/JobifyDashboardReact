function CustomTooltip({ payload, label, active }) {
    if (active) {
        return (
            <div style={{ width: "60px", height: '30px', display: 'flex', flexDirection: "column", alignContent: "center", justifyContent: "center", alignItems: "center", background: "#fff", borderRadius: "10px", fontSize: "12px" }}>
                <small>{`تعداد :${payload[0].value} `}</small>
            </div>
        );
    }

    return null;
}
export { CustomTooltip }