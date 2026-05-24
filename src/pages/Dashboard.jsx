import { FaHeart, FaPaw, FaPlus, FaTable, FaUsers } from 'react-icons/fa'
import Button from '../shared/Button'
import { adoptionRequests, dashboardPets, donations } from '../data/mockData'

const Dashboard = () => {
  const navItems = ['Add a pet', 'My added pets', 'Adoption requests', 'Create donation', 'My campaigns', 'My donations', 'Users', 'All pets', 'All donations']

  return (
    <main className="min-h-screen bg-pet-primary px-5 pb-24 pt-28">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[28px] bg-white p-5 shadow-xl outline outline-1 outline-(--pet-accent)/40">
          <h1 className="font-poppins text-2xl font-extrabold text-(--pet-secondary)">Dashboard</h1>
          <nav className="mt-6 grid gap-2">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} className="rounded-2xl px-4 py-3 font-poppins text-sm font-bold text-(--pet-dark) hover:bg-(--pet-light)">
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Pets added', dashboardPets.length, FaPaw],
              ['Open requests', adoptionRequests.length, FaHeart],
              ['Campaigns', donations.length, FaTable],
            ].map(([label, value, Icon]) => (
              <article key={label} className="rounded-[24px] bg-white p-6 shadow-xl">
                <Icon className="text-2xl text-(--pet-orange)" />
                <p className="mt-4 font-poppins text-sm font-bold uppercase text-(--pet-dark)">{label}</p>
                <h2 className="font-poppins text-4xl font-extrabold text-(--pet-secondary)">{value}</h2>
              </article>
            ))}
          </div>

          <section id="add-a-pet" className="rounded-[28px] bg-white p-6 shadow-xl">
            <h2 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">Add a pet</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {['Pet image', 'Pet name', 'Pet age', 'Pet category', 'Pickup location', 'Short description'].map((field) => (
                <input key={field} className="rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" placeholder={field} />
              ))}
              <textarea className="min-h-32 rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none md:col-span-2" placeholder="Long description editor placeholder" />
            </div>
            <Button className="mt-6 text-base"><FaPlus /> Submit Pet</Button>
          </section>

          <section id="my-added-pets" className="overflow-hidden rounded-[28px] bg-white shadow-xl">
            <div className="flex items-center justify-between p-6">
              <h2 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">My added pets</h2>
              <FaUsers className="text-(--pet-orange)" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left font-poppins">
                <thead className="bg-(--pet-light) text-(--pet-secondary)">
                  <tr>
                    {['#', 'Pet name', 'Category', 'Status', 'Actions'].map((head) => (
                      <th key={head} className="px-6 py-4">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dashboardPets.map((pet, index) => (
                    <tr key={pet.id} className="border-t border-(--pet-light)">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-bold text-(--pet-secondary)">{pet.name}</td>
                      <td className="px-6 py-4">{pet.category}</td>
                      <td className="px-6 py-4">{pet.adopted ? 'Adopted' : 'Not Adopted'}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {['Update', 'Delete', 'Adopted'].map((action) => (
                            <button key={action} className="rounded-full bg-(--pet-light) px-3 py-2 text-xs font-bold text-(--pet-secondary)">{action}</button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="adoption-requests" className="rounded-[28px] bg-white p-6 shadow-xl">
            <h2 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">Adoption requests</h2>
            <div className="mt-6 grid gap-4">
              {adoptionRequests.map((request) => (
                <article key={request.id} className="rounded-[20px] bg-(--pet-light) p-5">
                  <h3 className="font-poppins text-xl font-extrabold text-(--pet-secondary)">{request.petName} requested by {request.requester}</h3>
                  <p className="mt-2 font-poppins text-sm text-(--pet-dark)">{request.email} · {request.phone} · {request.location}</p>
                  <div className="mt-4 flex gap-3">
                    <button className="rounded-full bg-emerald-600 px-4 py-2 font-poppins text-sm font-bold text-white">Accept</button>
                    <button className="rounded-full bg-rose-600 px-4 py-2 font-poppins text-sm font-bold text-white">Reject</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}

export default Dashboard
