import { FaFilePdf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const documents = [
  "Certificate of Incorporation",
  "Memorandum of Association",
  "Article of Association",
  "GST Certificate",
  "FSSAI Certificate",
  "Trade Marks Application",
  "CS Verification Certificate",
  "Grievance",
];
const Compliances = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 mt-16 md:mt-20">
      <div
        className="relative bg-cover bg-center h-[250px] flex items-center justify-center"
        style={{
          backgroundImage: `url('/assets/bg-vision.png')`, // replace with your actual image path
        }}
      >
        <div className="absolute inset-0 bg-[#151875]/90"></div>

        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
Compliances Documents <span className="block w-12 h-1 bg-orange-500 mx-auto mt-2"></span>
          </h1>
          <div className="text-sm mt-4 text-orange-400">
            <span className="cursor-pointer hover:underline"><Link to="/" className="cursor-pointer hover:underline text-blue-600">
  Home
</Link></span> &gt;{' '}
            <span className="text-white">Compliances Documents</span>
          </div>
        </div>



      </div>

         <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        Legal And Ecommerce Compliances
        <span className="ml-3 w-12 h-1 bg-blue-500"></span>
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">#</th>
              <th className="px-4 py-2 border border-gray-300">Document</th>
              <th className="px-4 py-2 border border-gray-300">Download</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="px-4 py-2 border">{index + 1}.</td>
                <td className="px-4 py-2 font-semibold border">{doc}</td>
                <td className="px-4 py-2 border text-red-500 hover:underline flex items-center gap-2">
                  <FaFilePdf className="text-red-500" />
                  <a href="#" download className="text-sm hover:text-green-600 transition-colors">
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Compliances;
