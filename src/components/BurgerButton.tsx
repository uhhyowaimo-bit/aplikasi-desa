export default function BurgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2000,
        background: "#6a11cb",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        cursor: "pointer",
      }}
    >
      🍔
    </button>
  );
}
