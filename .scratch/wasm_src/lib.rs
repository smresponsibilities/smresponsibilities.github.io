#![no_std]

use core::panic::PanicInfo;

#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {}
}

const FIRST_HASH: u64 = 46106600;
const SECOND_HASH: u64 = 6999999;

#[no_mangle]
pub extern "C" fn hashfunction2(word_ptr: *const u8, len: usize) -> i32 {
    let slice = unsafe { core::slice::from_raw_parts(word_ptr, len) };
    let mut mid_result: u64 = 0;

    for (j, &byte) in slice.iter().enumerate() {
        let ch = if byte >= b'A' && byte <= b'Z' {
            byte + 32
        } else {
            byte
        };

        let mut p: u64 = 1;
        for _ in 0..j {
            p = (p * 26) % FIRST_HASH;
        }

        mid_result = (mid_result + ((ch as u64) * p)) % FIRST_HASH;
    }

    let hash_value = mid_result % FIRST_HASH;
    (hash_value % SECOND_HASH) as i32
}

#[no_mangle]
pub extern "C" fn wordColoring(target_ptr: *const u8, guess_ptr: *const u8, out_colors_ptr: *mut u8) {
    let target = unsafe { core::slice::from_raw_parts(target_ptr, 5) };
    let guess = unsafe { core::slice::from_raw_parts(guess_ptr, 5) };
    let out_colors = unsafe { core::slice::from_raw_parts_mut(out_colors_ptr, 5) };

    let mut letter_count = [0i32; 26];

    for &b in target.iter() {
        let idx = (to_upper(b) - b'A') as usize;
        if idx < 26 {
            letter_count[idx] += 1;
        }
    }

    // Pass 1: exact matches
    for i in 0..5 {
        let g = to_upper(guess[i]);
        let t = to_upper(target[i]);
        if g == t {
            out_colors[i] = b'G';
            let idx = (g - b'A') as usize;
            if idx < 26 {
                letter_count[idx] -= 1;
            }
        } else {
            out_colors[i] = b' ';
        }
    }

    // Pass 2: misplaced matches
    for i in 0..5 {
        if out_colors[i] != b'G' {
            let g = to_upper(guess[i]);
            let idx = (g - b'A') as usize;
            if idx < 26 && letter_count[idx] > 0 {
                out_colors[i] = b'Y';
                letter_count[idx] -= 1;
            } else {
                out_colors[i] = b'R';
            }
        }
    }
}

#[no_mangle]
pub extern "C" fn checkAlpha(ptr: *const u8, len: usize) -> i32 {
    let slice = unsafe { core::slice::from_raw_parts(ptr, len) };
    for &b in slice.iter() {
        if !((b >= b'a' && b <= b'z') || (b >= b'A' && b <= b'Z')) {
            return 0;
        }
    }
    1
}

#[no_mangle]
pub extern "C" fn randomIndex(day: i32, month: i32, total_words: i32) -> i32 {
    let mut seed = ((day + month) as u64) % 2147483647;
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    if total_words <= 0 {
        return 0;
    }
    (seed % (total_words as u64)) as i32
}

fn to_upper(b: u8) -> u8 {
    if b >= b'a' && b <= b'z' {
        b - 32
    } else {
        b
    }
}
