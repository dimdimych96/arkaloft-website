const fs = require('fs');

function analyze(filename) {
    try {
        const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const score = data.categories?.performance?.score * 100;
        console.log(`=== ${filename} ===`);
        console.log(`Performance Score: ${score}`);
        
        const audits = Object.values(data.audits)
            .filter(a => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'informative')
            .sort((a,b) => a.score - b.score)
            .slice(0, 10);
            
        console.log('Top issues:');
        audits.forEach(a => {
            console.log(`- ${a.id}: ${a.title} (Score: ${a.score})`);
            console.log(`  ${a.description}`);
            if (a.details && a.details.items) {
                console.log(`  Items: ${a.details.items.length}`);
            }
        });
        console.log('\n');
    } catch(e) {
        console.log(`Could not read or parse ${filename}`);
    }
}

analyze('report-perf.json');
analyze('report-perf-optimized.json');
