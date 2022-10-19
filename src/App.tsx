import DragList from './components/DragList';
import { LinkedProvider } from './context/LinkedProvider';
import { TopBar } from './components/TopBar';

const App = () => {

   // const input = document.getElementById('pdf');
   // html2canvas(input!, {
   //    scale: 2,
   //    width: 1200,

   // })
   //    .then((canvas) => {
   //       const imgData = canvas.toDataURL('image/png');
   //       const pdf = new jsPDF({
   //          orientation: "landscape",
   //       });
   //       pdf.addImage(imgData, 'JPEG',0,0,300,200);
   //       // pdf.output('dataurlnewwindow');
   //       pdf.save("download.pdf");
   //    });

   return <LinkedProvider>
      <>
         <TopBar />
         <DragList />
      </>
   </LinkedProvider>
}

export default App;