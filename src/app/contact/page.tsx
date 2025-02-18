import Contact from "@/components/sections/contact";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

export default function ContactPage() {
  return (
    <main>
      <Header />
      <Contact showForm={true}/>
      <Footer />
    </main>
  );
} 