$(function () {
  const initial = JSON.parse(JSON.stringify(PARTY_DATA));
  let data = JSON.parse(JSON.stringify(initial));
  const mode = window.APP_MODE;
  const is2 = mode === "task2";
  const cases = [
    "Who is in the hall?",
    "Yellow or purple clothes?",
    "AITU students upstairs?",
    "Glasses or a bag?",
    "Came with nothing?",
    "Phone but no bag?",
    "Arrived 20:30-21:00?",
    "After 21:00, not AITU?",
    "Next to Itachi Uchiha?",
    "Last in each room?",
    "Third in each room?",
    "Immediately after Kiba Inuzuka?",
    "Before someone in black?",
    "Which room has Ino Yamanaka?",
    "Rooms with fewer than 6?",
    "Cup but no glasses?",
    "First arrival in each room?",
    "Orochimaru joins the party",
    "Konan leaves",
    "Who took the cake?",
  ];
  const icon = {
      phone: "📱",
      glasses: "👓",
      bag: "👜",
      cup: "☕",
      crumbs: "🍰",
    },
    roomNames = {
      balcony: "Balcony",
      hall: "Hall",
      kitchen: "Kitchen",
      living: "Living room",
    };
  const min = (t) => {
    let a = t.split(":").map(Number);
    return a[0] * 60 + a[1];
  };
  const characterPictures = {
    "Naruto Uzumaki":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/156_261101_wp_en.webp",
    "Sasuke Uchiha":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/133_260723_en.webp",
    "Sakura Haruno":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/113_260401_wp_en.webp",
    "Kakashi Hatake":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/85_250915_en.webp",
    "Shikamaru Nara":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/144_260922_en.webp",
    "Hinata Hyuga":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/100_251227_en.webp",
    "Rock Lee":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/55_241128.webp",
    Gaara:
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/117_260501_wp_en.webp",
    "Ino Yamanaka":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/42_240924.webp",
    Tenten:
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/111_260309_en.webp",
    "Neji Hyuga":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/128_260703_en.webp",
    Temari:
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/82_250801_en.webp",
    "Kiba Inuzuka":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/129_260707_en.webp",
    "Choji Akimichi":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/16_240501.webp",
    Tsunade:
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/140_260802_en.webp",
    "Minato Namikaze":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/104_260125_en.webp",
    Konan:
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/108_260220_en.webp",
    "Itachi Uchiha":
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/123_260609_en.webp",
    Jiraiya:
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/94_251111_en.webp",
    Orochimaru:
      "https://naruto-official.com/special/wallpaper_gallery/wallpaper/en/thumbnail/154_261027_en.webp",
    "Shino Aburame":
      "https://shikimori.io/uploads/poster/characters/3428/main_2x-abc8a59e63c356c2baaddc3d05c42721.webp",
    "Kurenai Yuhi":
      "https://www.naruto.fi/wiki/images/thumb/c/c5/Kurenai.png/500px-Kurenai.png",
  };
  const characterNames = {
    Aigerim: "Naruto Uzumaki",
    Aliya: "Sasuke Uchiha",
    Madina: "Sakura Haruno",
    Ivan: "Kakashi Hatake",
    Arman: "Shikamaru Nara",
    Sophia: "Hinata Hyuga",
    Dias: "Rock Lee",
    Bekzat: "Gaara",
    Aruzhan: "Ino Yamanaka",
    Saule: "Tenten",
    Nurlan: "Neji Hyuga",
    Emma: "Temari",
    Timur: "Kiba Inuzuka",
    Sergey: "Shino Aburame",
    Yerlan: "Choji Akimichi",
    Kamila: "Tsunade",
    Daniel: "Minato Namikaze",
    Zarina: "Kurenai Yuhi",
    Natasha: "Konan",
    Askar: "Itachi Uchiha",
    Inkar: "Jiraiya",
    Miras: "Orochimaru",
  };
  function card(g) {
    let character = characterNames[g.name] || "Naruto character";
    return $(
      `<article class="guest color-${g.color} ${g.aitu ? "aitu" : "non-aitu"}" data-name="${g.name}" data-time="${g.time}" data-floor="${g.floor}" data-room="${g.room}" data-color="${g.color}" data-aitu="${g.aitu}" data-items="${g.items.join(",")}" style="--ring:var(--${g.color})"><div class="avatar"><img alt="${character} from Naruto" title="${character} · Naruto" src="${characterPictures[character] || `../assets/avatars/${encodeURIComponent(g.name)}.svg`}" onerror="this.onerror=null;this.src='../assets/avatars/${encodeURIComponent(g.name)}.svg'"></div><strong>${character}</strong><div class="time">◷ ${g.time}</div><div class="items">${g.items.map((x) => `<span class="item-${x}" title="${x}">${icon[x]}</span>`).join(" ")}</div>${g.aitu ? '<span class="badge" title="AITU student">🎓</span>' : ""}</article>`,
    );
  }
  function render() {
    let $h = $("#house").empty();
    [
      [2, "Floor 2", ["balcony", "hall"]],
      [1, "Floor 1", ["kitchen", "living"]],
    ].forEach(([n, title, ids]) => {
      let $f = $(
        `<section class="floor floor-${n}"><div class="floor-title">${title}</div><div class="rooms"></div></section>`,
      );
      ids.forEach((id) => {
        let $r = $(
          `<section class="room room-${id}" data-room="${id}"><div class="room-head"><h3>${roomNames[id]}</h3>${is2 ? '<button class="sort-room">Sort by time</button>' : ""}</div><div class="guest-list"></div></section>`,
        );
        data.guests
          .filter((g) => g.room === id)
          .forEach((g) => $r.find(".guest-list").append(card(g)));
        $f.find(".rooms").append($r);
      });
      $h.append($f);
    });
    if (is2) $("#motion-tools").prop("hidden", false);
  }
  function addMiras() {
    if (data.guests.some((g) => g.name === "Miras")) return;
    let g = {
      name: "Miras",
      room: "living",
      floor: 1,
      color: "blue",
      time: "21:20",
      aitu: true,
      items: ["phone"],
    };
    let ai = data.guests.findIndex((x) => x.name === "Askar");
    data.guests.splice(ai + 1, 0, g);
    card(g)
      .hide()
      .insertAfter($('.room-living [data-name="Askar"]'))
      .fadeIn(450);
  }
  function leaveNatasha() {
    if (!data.guests.some((g) => g.name === "Natasha")) return;
    $('.guest[data-name="Natasha"]')
      .stop(true, false)
      .fadeOut(450, function () {
        $(this).remove();
      });
    data.guests = data.guests.filter((g) => g.name !== "Natasha");
  }
  function query(n) {
    let $g = $("#house .guest"),
      $f = $(),
      $r = $(),
      msg = "";
    switch (n) {
      case 1:
        $f = $("#house .room-hall .guest");
        break;
      case 2:
        $f = $g.filter(".color-yellow,.color-purple");
        break;
      case 3:
        $f = $("#house .floor-2 .guest.aitu");
        break;
      case 4:
        $f = $g.filter(":has(.item-glasses),:has(.item-bag)");
        break;
      case 5:
        $f = $g.filter(function () {
          return !$(this).find(".items span").length;
        });
        break;
      case 6:
        $f = $("#house .guest:has(.item-phone):not(:has(.item-bag))");
        break;
      case 7:
        $f = $g.filter(function () {
          let t = min($(this).data("time"));
          return t >= 1230 && t <= 1260;
        });
        break;
      case 8:
        $f = $g.filter(function () {
          return min($(this).data("time")) > 1260 && !$(this).hasClass("aitu");
        });
        break;
      case 9: {
        let $a = $g.filter('[data-name="Askar"]'),
          i = $a.index();
        $f = $a.siblings(".guest").filter(function () {
          return Math.abs($(this).index() - i) === 1;
        });
        break;
      }
      case 10:
        $r = $("#house .room");
        $f = $r.find(".guest:last-child");
        break;
      case 11:
        $r = $("#house .room");
        $f = $r.find(".guest:nth-child(3)");
        break;
      case 12:
        $f = $g.filter('[data-name="Timur"]').nextAll(".guest").first();
        break;
      case 13:
        $f = $g.filter(".color-black").prev(".guest");
        break;
      case 14:
        $r = $g.filter('[data-name="Aruzhan"]').closest(".room");
        msg = "Ino Yamanaka is in the Hall.";
        break;
      case 15:
        $r = $("#house .room").filter(function () {
          return $(this).find(".guest").length < 6;
        });
        break;
      case 16:
        $r = $("#house .room").filter(function () {
          let $x = $(this);
          return (
            $x.find(".item-cup").length && !$x.find(".item-glasses").length
          );
        });
        break;
      case 17:
        $("#house .room").each(function () {
          let $all = $(this).find(".guest"),
            $first = $all.first();
          $all.each(function () {
            if (min($(this).data("time")) < min($first.data("time")))
              $first = $(this);
          });
          $f = $f.add($first);
        });
        break;
      case 18:
        addMiras();
        $f = $('#house .guest[data-name="Miras"]');
        break;
      case 19:
        leaveNatasha();
        msg = "Konan said goodbye and left the party.";
        break;
      case 20:
        $f = $("#house .floor-1 .guest").filter(function () {
          let $x = $(this),
            t = min($x.data("time"));
          return (
            t > 1260 &&
            t < 1290 &&
            $x.find(".item-crumbs").length &&
            !$x.find(".item-cup").length &&
            ($x.prev(".guest").hasClass("aitu") ||
              $x.next(".guest").hasClass("aitu"))
          );
        });
        msg =
          "The thief is Kurenai Yuhi: downstairs at 21:10, with crumbs and no cup, next to AITU student Minato Namikaze.";
        break;
    }
    return { $f, $r, msg };
  }
  function spotlight($f, $r) {
    let $all = $("#house .guest"),
      $keep = $f.length ? $f : $r.find(".guest");
    $all.stop(true, false).fadeTo(300, 0.2);
    $keep.stop(true, false).fadeTo(300, 1);
  }
  function run(n) {
    if (!is2) data = JSON.parse(JSON.stringify(initial));
    render();
    $(".case-buttons button")
      .removeClass("active")
      .filter(`[data-case="${n}"]`)
      .addClass("active");
    let { $f, $r, msg } = query(n);
    $f.addClass("highlight")
      .stop(true, false)
      .animate({ marginTop: -7 }, 160)
      .animate({ marginTop: 0 }, 160);
    $r.addClass("found-room");
    let names = $f
        .map(function () {
          return characterNames[$(this).data("name")] || $(this).data("name");
        })
        .get(),
      rooms = $r
        .map(function () {
          return $(this).find("h3").text();
        })
        .get();
    if (!msg)
      msg = names.length
        ? `${names.length} guest(s): ${names.join(", ")}`
        : rooms.length
          ? `${rooms.length} room(s): ${rooms.join(", ")}`
          : "No matches.";
    $("#result").text(`Case ${n}: ${msg}`);
    if (is2) spotlight($f, $r);
  }
  cases.forEach((x, i) =>
    $("#case-buttons").append(
      $(`<button data-case="${i + 1}">Case ${i + 1}. ${x}</button>`),
    ),
  );
  $("#case-buttons").on("click", "button", function () {
    run(+$(this).data("case"));
  });
  $("#reset").on("click", function () {
    data = JSON.parse(JSON.stringify(initial));
    render();
    $("#result").text("Party reset to the original picture.");
  });
  $("#clear").on("click", function () {
    $("#house .guest")
      .stop(true, false)
      .fadeTo(300, 1)
      .removeClass("highlight");
    $("#house .room").removeClass("found-room");
    $("#result").text("Highlights cleared.");
  });
  if (is2) {
    let current = null,
      origin = null;
    function close() {
      if (!current) return;
      let $m = $("#guest-modal"),
        $c = $(".modal-card");
      $c.stop(true, false).animate(
        {
          top: origin.top,
          left: origin.left,
          width: origin.width,
          height: origin.height,
          opacity: 0.25,
        },
        220,
        function () {
          $m.hide().prop("hidden", true);
          $c.attr("style", "");
          current = null;
        },
      );
    }
    function open($guest) {
      if (current) {
        $(".modal-card").stop(true, false);
        $("#guest-modal").hide().prop("hidden", true);
        current = null;
      }
      current = $guest;
      let $av = $guest.find(".avatar"),
        o = $av.offset(),
        g = data.guests.find((x) => x.name === $guest.data("name"));
      origin = {
        top: o.top,
        left: o.left,
        width: $av.outerWidth(),
        height: $av.outerHeight(),
      };
      let $content = $(".modal-content")
        .empty()
        .append(
          $av.clone(),
          $(
            `<h2>${characterNames[g.name] || g.name}</h2><p>Came at ${g.time}</p><p>${g.aitu ? "AITU student" : "Not an AITU student"}</p><p>Wears ${g.color}; has ${g.items.length ? g.items.join(" and ") : "nothing"}.</p><div class="move-buttons"></div>`,
          ),
        );
      data.rooms
        .filter((r) => r.id !== g.room)
        .forEach((r) =>
          $content
            .find(".move-buttons")
            .append(
              $(`<button data-dest="${r.id}">Move to ${r.name}</button>`),
            ),
        );
      let $m = $("#guest-modal").prop("hidden", false).show(),
        $c = $(".modal-card");
      $m.css("display", "grid");
      $c.css({
        position: "fixed",
        top: o.top,
        left: o.left,
        width: o.width,
        height: o.height,
        overflow: "hidden",
        opacity: 0.3,
      })
        .stop(true, false)
        .animate(
          {
            top: Math.max(20, (innerHeight - 330) / 2),
            left: Math.max(20, (innerWidth - 420) / 2),
            width: 420,
            height: 330,
            opacity: 1,
          },
          350,
          function () {
            $c.css({ height: "auto", overflow: "visible" });
          },
        );
    }
    function move(dest) {
      if (!current) return;
      let $g = current,
        g = data.guests.find((x) => x.name === $g.data("name")),
        $from = $g.parent(),
        $to = $(`.room-${dest} .guest-list`),
        a = $g.offset(),
        b = $to.offset(),
        $slot = $('<div class="empty-slot"></div>').insertAfter($g),
        $clone = $g.clone().addClass("flying").appendTo("body");
      $clone.css({
        position: "absolute",
        top: a.top,
        left: a.left,
        width: $g.outerWidth(),
      });
      $g.detach();
      close();
      $clone
        .stop(true, false)
        .animate({ top: b.top + 35, left: b.left + 25 }, 480, function () {
          $clone.remove();
          $to.append($g);
          g.room = dest;
          g.floor = dest === "balcony" || dest === "hall" ? 2 : 1;
          data.guests = data.guests.filter((x) => x !== g);
          data.guests.push(g);
          $g.attr({ "data-room": g.room, "data-floor": g.floor });
          $slot
            .stop(true, false)
            .animate({ width: 0, opacity: 0 }, 220, function () {
              $slot.remove();
            });
        });
    }
    function sort($room) {
      let id = $room.data("room"),
        $list = $room.find(".guest-list"),
        cards = $list.children(".guest").toArray(),
        before = new Map(cards.map((el) => [el, $(el).offset()])),
        sorted = !$room.data("sorted"),
        ordered;
      if (sorted)
        ordered = cards
          .slice()
          .sort((a, b) => min($(a).data("time")) - min($(b).data("time")));
      else
        ordered = data.guests
          .filter((g) => g.room === id)
          .map((g) => cards.find((el) => $(el).data("name") === g.name))
          .filter(Boolean);
      $room.find(".guest").stop(true, false);
      ordered.forEach((el) => $list.append(el));
      ordered.forEach((el) => {
        let old = before.get(el),
          now = $(el).offset();
        $(el)
          .css({
            position: "relative",
            left: old.left - now.left,
            top: old.top - now.top,
          })
          .stop(true, false)
          .animate({ left: 0, top: 0 }, 420);
      });
      $room.data("sorted", sorted);
    }
    $("#house").on("click", ".guest", function () {
      open($(this));
    });
    $(document).on("click", function (e) {
      if (
        current &&
        !$(e.target).closest(".modal-card").length &&
        !$(e.target).closest(".guest").length
      )
        close();
    });
    $("#guest-modal")
      .on("click", ".move-buttons button", function () {
        move($(this).data("dest"));
      })
      .find(".close")
      .on("click", close);
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    $("#house").on("click", ".sort-room", function (e) {
      e.stopPropagation();
      sort($(this).closest(".room"));
    });
  }
  render();
});
