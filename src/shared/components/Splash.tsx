import kuroomIcon from "@assets/icon/cloud.svg";

const Splash = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "14px",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "67px", height: "44px" }}
          src={kuroomIcon}
          alt="쿠룸 아이콘"
        />
        <h1
          style={{
            color: "#009733",
            fontSize: "35px",
            fontWeight: "800",
            textAlign: "center",
            fontStyle: "normal",
            lineHeight: "120%",
          }}
        >
          KUROOM
        </h1>
      </div>
      <span
        style={{
          color: "#009733",
          fontSize: "20px",
          fontWeight: "600",
          textAlign: "center",
          fontStyle: "normal",
          lineHeight: "120%",
          letterSpacing: "9.4px",
          marginLeft: "10px",
        }}
      >
        지도를 재해석하다
      </span>
    </div>
  );
};

export default Splash;
