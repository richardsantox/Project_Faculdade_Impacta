using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarZone.src.Controllers
{
    public class VeiculoController : Controller
    {
        // GET: VeiculosController
        public ActionResult Index()
        {
            return View();
        }

        // GET: VeiculosController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: VeiculosController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: VeiculosController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: VeiculosController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: VeiculosController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: VeiculosController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: VeiculosController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
