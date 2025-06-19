export const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">chaat</div>
            <p className="text-gray-600 mb-6 max-w-md">
              The most powerful platform for creating intelligent social media bots
            </p>
            <div className="flex space-x-4">
              {['T','L','G'].map((c) => (
                <div key={c} className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                  <span className="text-gray-900 font-bold">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {[
            { title:'Product',    links:['Features','Pricing','Templates','Integrations','API'] },
            { title:'Resources',  links:['Docs','Help Center','Blog','Community','Status'] },
            { title:'Company',    links:['About','Careers','Contact','Privacy','Terms'] },
          ].map(({title,links}) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-3 text-gray-600">
                {links.map(l => (
                  <li key={l}>
                    <a href="#" className="hover:text-gray-900 transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">&copy; 2025 chaat. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-gray-600 text-sm">
            {['Privacy Policy','Terms of Service','Cookie Policy'].map(text => (
              <a key={text} href="#" className="hover:text-gray-900 transition">{text}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
