# ToDoList

Celem projektu jest stworzenie aplikacji typu SPA (single page application). Backend stanowi serwer RESTowy, udostêpniaj¹cy dane w postaci JSON (mo¿na wykorzystaæ json-server). Klient dzia³aj¹cy w przegl¹darce komunikuje siê z nim przy pomocy AJAX. Dozwolone (a nawet zalecane) jest korzystanie z javascriptowych bibliotek i frameworków (np. Angular, React, Vue, Bakcbone, Knockout, Ember).

Aplikacja powinna pozwalaæ na przegl¹danie, dodawanie, usuwanie oraz edycjê danych. Rodzaj tych danych nale¿y okreœliæ samemu, trzymaj¹c siê ogólnych wytycznych (liczby w nawiasach oznaczaj¹ punktacjê, maksymalnie mo¿na zdobyæ za projekt 10 punktów):

Obowi¹zkowa podstawa >(3): CRUD do pojedynczej tabeli (np. ksi¹¿ki, pracownicy, zakupy, piosenki), jej rekordy powinny mieæ co najmniej 5 pól (u¿yj paru ró¿nych typów, np. tekst, liczba, data)
>(+1) - przynajmniej dwie tabele po³¹czone relacj¹ jeden-do-wielu (np. autor-ksi¹¿ki, rejon-pracownicy, zamówienie-produkty)
(dodatkowo +1) - jeœli w powy¿szym wyst¹pi relacja wiele-do-wielu (np. ksi¹¿ka mo¿e mieæ wielu autorów, pracownik mo¿e byæ przypisany do wielu rejonów)
>(+1) - u¿ytkownik ma mo¿liwoœæ sortowania (wg. dwóch czy trzech kryteriów)
(+1) - u¿ytkownik ma mo¿liwoœæ wyszukiwania/filtrowania danych (np. "poka¿ ksi¹¿ki o tytule zaczynajacym siê od ...", "poka¿ wszystkie ksi¹¿ki danego autora")
>(+1) - zaimplementowano poprawnie dzia³aj¹cy routing po stronie klienta
>(+1) - bardziej z³o¿ona ni¿ sam CRUD logika, pasuj¹ca do tematu projektu
>(+1) - wysoki user experience (wygoda, atrakcyjnoœæ, obecnoœæ grafik i animacji, responsywnoœæ)
(+1) - wszelkie inne sensowne i nietrywialne dodatki wzbogacaj¹ce aplikacjê