import wget

for i in range(1,562):
    url = f"https://25live.collegenet.com/25live/data/cpp/run/list/listdata.json?compsubject=location&sort=name&order=asc&page={i}&page_size=1&obj_cache_accl=0&category_id=112+2+3+4+5+6+113+114+119+115+120+118+116+117+8+10+15+16+17+18+19+21+22+23+24+25+26+27+28+29+31+32+33+34+35+36+37+38+42+39+40+41+43+45&caller=pro-ListService.getData"
    wget.download(url, f"data/row-{i}.json")