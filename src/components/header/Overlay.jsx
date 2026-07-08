const Overlay=({open,onClose})=>{

if(!open) return null;

return(

<div

onClick={onClose}

className="fixed inset-0 bg-black/40"

>

</div>

)

}

export default Overlay;