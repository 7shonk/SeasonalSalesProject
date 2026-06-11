import os
import json
import base64
import urllib.request
import urllib.error

def make_request(url, token, method="GET", data=None):
    req = urllib.request.Request(url)
    req.method = method
    req.add_header("Authorization", f"token {token}")
    req.add_header("Accept", "application/vnd.github.v3+json")
    req.add_header("User-Agent", "Python-GitHub-Uploader")
    
    if data is not None:
        req.add_header("Content-Type", "application/json")
        req_data = json.dumps(data).encode("utf-8")
    else:
        req_data = None
        
    try:
        with urllib.request.urlopen(req, data=req_data) as response:
            return response.status, json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        try:
            err_json = json.loads(body)
        except:
            err_json = body
        return e.code, err_json
    except Exception as e:
        return 0, str(e)

def upload_file(username, repo, token, file_path, repo_path):
    url = f"https://api.github.com/repos/{username}/{repo}/contents/{repo_path}"
    
    # Read file content
    with open(file_path, "rb") as f:
        content = f.read()
    
    encoded_content = base64.b64encode(content).decode("utf-8")
    
    # Check if file already exists to get its SHA (required for updating files on GitHub API)
    status, res = make_request(url, token, "GET")
    sha = None
    if status == 200:
        sha = res.get("sha")
        
    data = {
        "message": f"Upload {repo_path} via API",
        "content": encoded_content
    }
    if sha:
        data["sha"] = sha
        
    status, res = make_request(url, token, "PUT", data)
    return status, res

def main():
    print("=== GitHub API 專案上傳工具 ===")
    print("提示：本工具會為您將程式碼與網頁上傳至 GitHub，會自動排除 100MB+ 的原始大數據 CSV 檔案。")
    print("-" * 50)
    
    token = input("請輸入您的 GitHub Personal Access Token (PAT): ").strip()
    if not token:
        print("錯誤：Token 不能為空！")
        return
        
    username = input("請輸入您的 GitHub 使用者名稱: ").strip()
    if not username:
        print("錯誤：使用者名稱不能為空！")
        return
        
    repo_name = input("請輸入要建立的 GitHub 倉庫名稱 (預設: SeasonalSalesProject): ").strip()
    if not repo_name:
        repo_name = "SeasonalSalesProject"
        
    # 1. 建立倉庫
    print(f"\n[1/3] 正在嘗試建立 GitHub 倉庫 '{repo_name}'...")
    create_url = "https://api.github.com/user/repos"
    create_data = {
        "name": repo_name,
        "description": "季節性銷售：大數據分析與購買最佳時機預測系統",
        "private": False,
        "auto_init": False
    }
    status, res = make_request(create_url, token, "POST", create_data)
    
    if status == 201:
        print(f"✅ 成功建立新倉庫！網址: https://github.com/{username}/{repo_name}")
    elif status == 422 and "already exists" in str(res):
        print(f"ℹ️ 倉庫 '{repo_name}' 已經存在，將直接更新/上傳裡面的檔案。")
    else:
        print(f"❌ 建立倉庫失敗 (狀態碼 {status}): {res}")
        if status == 401:
            print("請檢查您的 Token 是否正確，且是否擁有 'repo' 權限。")
        return
        
    # 2. 收集需要上傳的檔案
    files_to_upload = []
    
    # 遍歷 website 目錄
    website_dir = "website"
    if os.path.exists(website_dir):
        for root, dirs, files in os.walk(website_dir):
            for file in files:
                if file.lower() == "desktop.ini":
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ".")
                repo_path = rel_path.replace("\\", "/")
                files_to_upload.append((full_path, repo_path))
                
    # 加入 analysis.py
    if os.path.exists("analysis.py"):
        files_to_upload.append(("analysis.py", "analysis.py"))
        
    # 加入 README.md
    if os.path.exists("README.md"):
        files_to_upload.append(("README.md", "README.md"))
        
    print(f"\n[2/3] 準備上傳 {len(files_to_upload)} 個檔案...")
    
    # 3. 開始上傳
    success_count = 0
    for file_path, repo_path in files_to_upload:
        print(f" 正在上傳 {repo_path} ...", end="", flush=True)
        try:
            status, res = upload_file(username, repo_name, token, file_path, repo_path)
            if status in (200, 201):
                print(" [OK]")
                success_count += 1
            else:
                msg = res.get('message', res) if isinstance(res, dict) else res
                print(f" [失敗 (狀態碼 {status}): {msg}]")
        except Exception as upload_err:
            print(f" [異常失敗: {upload_err}]")
            
    print("-" * 50)
    print(f"🎉 上傳完成！成功: {success_count}/{len(files_to_upload)} 個檔案。")
    print(f"專案網址: https://github.com/{username}/{repo_name}")
    input("\n按 Enter 鍵結束程式...")

if __name__ == "__main__":
    main()
