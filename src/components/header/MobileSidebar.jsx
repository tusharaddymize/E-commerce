const MobileSidebar = ({ open, closeSidebar }) => {

    if (!open) return null;

    return (

        <aside
            className="fixed left-0 top-0 h-screen w-80 bg-white z-50"
        >

            <button onClick={closeSidebar}>
                Close
            </button>

        </aside>

    )

}

export default MobileSidebar;