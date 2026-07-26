export default function Loading() {
  return (
    <div className="home-container">
      <div className="skeleton skeleton-hero"></div>
      <div className="latest-articles-section">
         <div className="section-header">
           <div className="skeleton" style={{width: "200px", height: "32px", borderRadius: "8px"}}></div>
           <div className="section-divider" style={{marginTop: "10px"}}></div>
         </div>
         <div className="skeleton skeleton-text-lg" style={{width: "100%", height: "45px", marginBottom: "30px"}}></div>
         
         {[1, 2, 3, 4, 5].map((i) => (
           <div key={i} className="skeleton-card">
             <div className="skeleton skeleton-img"></div>
             <div className="skeleton-content">
               <div className="skeleton skeleton-text-lg"></div>
               <div className="skeleton skeleton-text-md"></div>
               <div className="skeleton skeleton-text-md"></div>
               <div className="skeleton skeleton-text-sm"></div>
             </div>
           </div>
         ))}
      </div>
    </div>
  )
}
