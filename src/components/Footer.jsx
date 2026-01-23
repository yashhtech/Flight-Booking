const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white px-10 py-16 grid md:grid-cols-4 gap-10">
      <div>
        <h3 className="font-bold text-lg">Flivain</h3>
        <p className="text-sm mt-3 text-slate-400">
          Flight booking made easy.
        </p>
      </div>

      <div>
        <h4 className="font-semibold">Company</h4>
        <ul className="mt-3 space-y-2 text-slate-400">
          <li>About</li>
          <li>Careers</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">Support</h4>
        <ul className="mt-3 space-y-2 text-slate-400">
          <li>Help Center</li>
          <li>Contact</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">Legal</h4>
        <ul className="mt-3 space-y-2 text-slate-400">
          <li>Privacy</li>
          <li>Terms</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
