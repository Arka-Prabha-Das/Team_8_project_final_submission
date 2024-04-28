import Header from "./Header";
import heading from "../assets/heading.jpeg";
import Person1 from "../assets/team/1.png";
import Person2 from "../assets/team/2.png";
import Person3 from "../assets/team/3.png";
import Person4 from "../assets/team/4.png";
import Person5 from "../assets/team/5.png";
import Person6 from "../assets/team/6.png";
const Team = () => {
    const teamPpl = [
        { img: Person1, name: "Akshitha Janapana", job: "Student" },
        { img: Person2, name: "Arka Prabha Das", job: "Student" },
        { img: Person3, name: "Rohit Biswa Karma", job: "Student" },
        { img: Person4, name: "Gayathri Vangara ", job: "Student" },
        { img: Person5, name: "Sri Chetan Dasari", job: "Student" },
        { img: Person6, name: "Trinadh Ram Kumar Pilli", job: "Student" },
    ];
    return (

        <div>
            <div className="bg-cover bg-center w-[100%] h-[30vh]  text-center "
                style={{ backgroundImage: `url(${heading})` }}>
                <div className="bg-[rgba(250,250,250,0.7)] h-[30vh] flex flex-col justify-between">
                    <Header />
                </div>
            </div>
            <div className="w-[80%] flex  flex-col flex-wrap gap-[5%] justify-center mx-auto mt-20 text-center lg:flex-row">
                {teamPpl.map((ppl, id) => (
                    <div key={id} className="lg:w-[25%] shadow-xl mb-10">
                        <div className="w-full bg-slate-100">
                            <img src={ppl.img} alt="team_img" />
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-xl">{ppl.name}</h3>
                            <p className="font-bold text-gray-400">{ppl.job}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
export default Team;