console.log("スクリプトが実行されています");

const documentContent = `2024.8.19
衣笠

[ミニ型試作について]

UPDATE情報

• ダンベル試験片　今回注文分の製作作業は終了。試験片の評価作業注。
• ロアスペーサー　今回分は終了・型廃棄。次回以降ある場合は、型再製作からスタート。
• キャップ　　　　実施予定（時期未定）。最終データ待ち。
• ディップスポット他3型　ミニ型現状対応困難のため、簡易型で検討進める。

その他：

• 樹脂ピン　　改造品の引き合いあり。型（ミニ型）再製作から。（現行品テクノ殿対応）

9月末の試作（工場2回目トライ）について：現時点で以下2点。半日程度の試作ご相談。

• ダンベル型の再製作を、試作品の評価結果も踏まえてから、他材料でトライしてみたい。
　（数本程度）
• 6464受波のインサート成形トライを実施したい。
　前回試作では成形トライのみしかできず、インサート入りのトライができなかったため。

当面は沖沼津殿向けの課題を一つ一つこなしていく形になるかと思います。

工場成形では量産成形の合間をみたタイミング取りになるため、期日があるものは従来から協力いただいているテクノ工房殿にも協力仰ぎながら柔軟に対応していきたい。

ただし、この沼津向け案件は、基本的に先方担当者のご要望次第になるかと思います。

一般向け引き合い（＝沼津以外）については、データ作成～成形までのすべての工程でさらに柔軟な対応ができるような仕組みを作らないと安定供給が難しいと考えており、

ミニ型そのものに興味があるという先と商売的（予算・納期、品質的）な話を抜きにして

できるかわからないけどやってみようかな、くらいの対応までが精一杯かなと感じます。

展示会向けに展開しておりますが、現状は引き合い無し。9月末くらいまでに最終確定。

[スラスター部品（海洋電子工業向け）]

来年度分内示あり。今年度と同じくらいの数量が出る見込みです。

現在配備中の艦船に順次搭載（～R10)されていく予定のため、将来的な保守用など含めると数量は減っても半永久的に出ることがほぼ確実視されているとのことです。

そのためなるべく書類作成などの流れは一元化して整理していきたく、現在営業で対応している検査成績書の管理や、保守用在庫の管理などについては来年度以降分から順次工場（品管）管理に移管していきたい考えです。

書類作成や管理費用などのコストなどもなるべく「見える化」して、数量が減った時にでもきちんと必要なコストを回収できるように客先と調整していきたいと思っています。

今後もうしばらくはどのようなモノの流れになるか（特に年間計画と別に来る保守向けスポットの引き合い）観察しながら進めていければと思っています。特に急ぎの課題ではないですが、上記の考えでいます。

これに関してというわけではありませんが、現在都立産業試験所の測定器で実施している自動測定作業を品管さん（横田氏）に同行いただき立ち合いしていただく予定です。

以上`;

function formatContent(content) {
    const lines = content.split('\n');
    let formattedContent = '';
    let inList = false;

    lines.forEach((line, index) => {
        let elementContent = '';
        if (index === 0) {
            elementContent = `<div class="date reveal">${line}</div>`;
        } else if (line.startsWith('[') && line.endsWith(']')) {
            elementContent = `<h2 class="section-title reveal">${line.slice(1, -1)}</h2>`;
        } else if (line.trim() === '') {
            if (inList) {
                elementContent += '</ul>';
                inList = false;
            }
            elementContent += '<br>';
        } else if (line.trim().startsWith('•')) {
            if (!inList) {
                elementContent += '<ul>';
                inList = true;
            }
            elementContent += `<li class="reveal">${line.trim().substring(1).trim()}</li>`;
        } else {
            if (inList) {
                elementContent += '</ul>';
                inList = false;
            }
            elementContent += `<p class="reveal">${highlightKeywords(line)}</p>`;
        }
        formattedContent += `<div class="reveal-container">${elementContent}</div>`;
    });

    return formattedContent;
}

function highlightKeywords(text) {
    const keywords = [
        'UPDATE情報', '試作', '工場成形', '展示会', 'スラスター部品',
        '来年度分', '検査成績書', '保守用在庫', '見える化', '自動測定作業'
    ];
    
    keywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi');
        text = text.replace(regex, match => `<span class="highlight">${match}</span>`);
    });

    const importantPhrases = ['急ぎの課題', '半永久的', '安定供給が難しい'];
    importantPhrases.forEach(phrase => {
        const regex = new RegExp(phrase, 'gi');
        text = text.replace(regex, match => `<span class="important">${match}</span>`);
    });

    return text;
}

function populateProgressTable() {
    const tableBody = document.querySelector('#progressTable tbody');
    const progressData = [
        { item: 'ダンベル試験片', status: '完了', notes: '評価作業中' },
        { item: 'ロアスペーサー', status: '進行中', notes: '材料調達待ち' },
        { item: 'キャップ', status: '遅延', notes: '設計変更のため' },
        { item: 'ディップスポット', status: '計画段階', notes: '来週開始予定' },
        { item: '樹脂ピン', status: '保留', notes: '優先度再検討中' }
    ];

    progressData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.item}</td>
            <td>${row.status}</td>
            <td>${row.notes}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function createBudgetChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['4月', '5月', '6月', '7月', '8月'],
            datasets: [{
                label: '予算残高 (%)',
                data: [100, 90, 80, 70, 60],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: '予算残高 (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '月'
                    }
                }
            }
        }
    });
}

function setupDetailsButton() {
    const detailsButton = document.getElementById('detailsButton');
    detailsButton.addEventListener('click', () => {
        window.location.href = 'details.html';
    });
}

function checkScroll() {
    const revealContainers = document.querySelectorAll('.reveal-container');
    const windowHeight = window.innerHeight;
    const resetPoint = windowHeight * 0.1; // 10% of viewport height

    revealContainers.forEach((container) => {
        const revealer = container.querySelector('.reveal');
        if (revealer) {
            const rect = container.getBoundingClientRect();
            const revealTop = rect.top;
            const revealBottom = rect.bottom;

            if (revealTop < windowHeight - 150 && revealBottom > 0) {
                revealer.classList.add('active');
                revealer.classList.remove('reset');
            } else if (revealTop > windowHeight - resetPoint || revealBottom < resetPoint) {
                revealer.classList.remove('active');
                revealer.classList.add('reset');
            }
        }
    });
}

function checkSlideIn() {
    const slideElements = document.querySelectorAll('.slide-in-right');
    const windowHeight = window.innerHeight;

    slideElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            element.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('documentContent');
    if (contentDiv) {
        contentDiv.innerHTML = formatContent(documentContent);
    }
    
    populateProgressTable();
    createBudgetChart();
    setupDetailsButton();
    
    window.addEventListener('scroll', () => {
        checkScroll();
        checkSlideIn();
    });
    checkScroll(); // Initial check
    checkSlideIn(); // Initial check
});

console.log("スクリプトの実行が完了しました");