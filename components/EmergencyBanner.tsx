export default function EmergencyBanner() {
  return (
    <div className="bg-rescue-red text-white py-2 px-4 text-center text-sm font-medium fixed top-0 left-0 right-0 z-[60]">
      <span className="inline-flex items-center">
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <strong>In an emergency, always dial 911.</strong>
        <span className="hidden sm:inline ml-1">
          We are dispatched through Pierce County Emergency Management.
        </span>
      </span>
    </div>
  )
}
