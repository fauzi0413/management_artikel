export default function AboutLoading() {
  return (
    <div className="main-heading" style={{ textAlign: "center", padding: "40px 0" }}>
      <div className="skeleton" style={{ width: "150px", height: "150px", margin: "0 auto 20px", borderRadius: "16px" }}></div>
      <div className="skeleton skeleton-text-lg" style={{ width: "300px", margin: "0 auto 30px" }}></div>
      <div className="skeleton skeleton-text-md" style={{ maxWidth: "800px", margin: "0 auto 15px", height: "20px" }}></div>
      <div className="skeleton skeleton-text-md" style={{ maxWidth: "750px", margin: "0 auto 15px", height: "20px" }}></div>
      <div className="skeleton skeleton-text-md" style={{ maxWidth: "600px", margin: "0 auto 40px", height: "20px" }}></div>
    </div>
  )
}
