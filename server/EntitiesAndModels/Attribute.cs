using ClosedXML.Excel;
using JohnsonNet;
using Microsoft.AspNetCore.Http;

namespace EntitiesAndModels
{
    [AttributeUsage(AttributeTargets.All)]
    public class NewAttribute : Attribute
    {

        public string title;
        public NewAttribute(string t)
        {
            title = t;
        }

        public static dynamic AttributeDisplay(Type classType)
        {
            var columnList = JohnsonManager.Reflection.GetPropertiesWithoutHidings(classType)
              .Where(property => property.GetAttribute<NewAttribute>() != null).Select(property => new ExcelHelper
              {
                  Attribute = property.GetAttribute<NewAttribute>(),
                  PropertyName = property.Name,
                  ////PropertyType = property.PropertyType
              });
            return columnList;
        }
        public static bool ValidateHeaders<T>(IFormFile file, T entity)
        {
            int exits = 0;
            var wb = new XLWorkbook(file.OpenReadStream());
            var sheetName = wb.Worksheets.First().Name;
            var ws = wb.Worksheet(sheetName);
            var row = ws.Row(1);
            for (int i = 1; i < ws.LastColumnUsed().ColumnNumber(); i++)
            {
                foreach (var item in AttributeDisplay(typeof(T)))
                {
                    var name = item.Attribute.title;
                    if (name == row.Cell(i).Value.ToString())
                    {
                        exits++;
                    }
                    if (exits == ws.LastColumnUsed().ColumnNumber())
                    {
                        return false;
                    }
                    i++;
                }

            }
            return true;
        }
        public class ExcelHelper
        {
            public NewAttribute Attribute { get; set; }
            public string PropertyName { get; set; }
            ////// public Type PropertyType { get; set; }
        }
    }

}
