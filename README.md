# SVG_parsing
README v1
===========

Использование Error и Exception
-----------
// test
> Error должен использоваться для указания проблем в коде, требующих внимания программиста (такие как неправильный тип входящих данных и синтаксические ошибки). Exception должен использоваться, когда исключение может «безопасно» обработаться, и выполнение программы может продолжиться.
Поскольку, объекты Error не могут быть обработаны во время выполнения программы, «ловля» Error должна быть редкостью. В целом, Error должны быть пойманы только для логирования их, необходимой «чистки данных», и отображения ошибки для пользователя.

// Для использования требуется обязательно подключить PHPExcel
include_once(\SB\ROOT . '/vendors/PHPExcel/PHPExcel.php');

// Создаем Объект ExcelReader
$ExcelReader = new \SB\ExcelReader(\SB\ROOT . '/upload/diski.xlsx');

// Обязательная функция. Задает диапазона колонок
$ExcelReader->setRangeColumns('A','H');

// Строка с которой начинать
$ExcelReader->setStartRow(3);

// Устанавливаем сколько читать строк за раз
$ExcelReader->setPartSize(200);

// Читает по 200 строк.  Можно делать дейсвия для каждой частью, либо прочитать все и обработать весь массив
while(!$ExcelReader->readPartOfFile())
{
    // Действия над $ExcelReader->getRows()
    // .....
}

// Действия над $ExcelReader->getRows()
// .....

// Прочитанные строки
$arRows = $ExcelReader->getRows();

// Запись файла -----------------------------

// Тестовый массив данных
$arElements = \SB\IBlock::getElements(array(), array('IBLOCK_ID'=>\SB\Site::IBLOCK_ID_PAGE), false, false, array('ID','NAME','PREVIEW_TEXT'));

$Csv = new \SB\Csv();
// Устанавливаем строкус названиями колонок
$Csv->setHeadRow('id','name','text');

// Добавляем строки в объект
foreach($arElements as $arElement)
{
    $Csv->addRow($arElement['ID'], $arElement['NAME'], $arElement['PREVIEW_TEXT']);
}

// Запиь данных в файл
$Csv->saveFile($_SERVER['DOCUMENT_ROOT'] . '/upload/test.csv','UTF-8');

// ===========================================



// Чтение файла -----------------------------
$Csv = new \SB\Csv();
$Csv->readFile($_SERVER['DOCUMENT_ROOT'] . '/upload/test.csv', 'UTF-8');

// Получение данных по названию колонок
$arList = array();
while($Row = $Csv->eachRow())
{

    $id = $Row->getCellByName('id');
    $name = $Row->getCellByName('name');

    $arList[$id] = $name;
}

// Получение данных по индексу
while($Csv->eachRow())
{
    $id = $Csv->getCurrentRow()->getCell(0);
    $name = $Csv->getCurrentRow()->getCell(1);


    $arList[$id] = $name;
}
// =============================================


// Изменение файла  -----------------------------
$Csv = new \SB\Csv();
$Csv->readFile($_SERVER['DOCUMENT_ROOT'] . '/upload/test.csv', 'UTF-8');

// Получение данных по названию колонок
$arList = array();
while($Row = $Csv->eachRow())
{

    $id = $Row->getCellByName('id');
    $name = $Row->getCellByName('name');

    $arList[$id] = $name;
}

// Получение данных по индексу
while($Row = $Csv->eachRow())
{
    $Row->setCellByName('name', strtoupper($Row->getCellByName('name')));
}

$Csv->saveFile($_SERVER['DOCUMENT_ROOT'] . '/upload/test.csv','UTF-8');
// =============================================

